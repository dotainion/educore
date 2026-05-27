import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { GlobalSearch } from "../widgets/GlobalSearch";
import { BiCheck } from "react-icons/bi";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import { useIsMobile } from "./MobileTransformable";
import { v4 as uuid4 } from "uuid";
import { useLocation } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";

export const GlobalSearchFilter = ({ className, items, buttons, mapSameNameToArray, onChange, alwaysOpen, name, placeholder, children }) => {
    const [selectedMap, setSelectedMap] = useState(() => new Map());
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [options, setOptions] = useState([]);

    const location = useLocation();

    const didChangeRef = useRef(false);

    const selected = useMemo(() => {
        return Array.from(selectedMap.values());
    }, [selectedMap]);

    const onSelect = useCallback((filter) => {
        didChangeRef.current = true;
        setSelectedMap((prev) => {
            const next = new Map(prev);
            if (next.has(filter.id)) next.delete(filter.id);
            else next.set(filter.id, filter);
            return next;
        });
    }, []);

    const onSearch = useCallback((e) => {
        didChangeRef.current = true;
        setSearch(e.target.value);
    }, []);

    useIsMobile((is)=>{
        setIsMobile(is);
    }, []);

    useEffect(() => {
        if(!didChangeRef.current) return;

        const payload = {};
        if(!name) name = 'search';
        if (search) payload[name] = search;

        if(mapSameNameToArray === 'STRING_ON_SINGLE_ITEM'){
            selected.forEach((s) => {
                const filter = selected.filter((f)=>f.name === s.name);
                if(filter.length > 1){
                    if(!payload[s.name]) payload[s.name] = [];
                    payload[s.name].push(s.value);
                }else{
                    payload[s.name] = s.value;
                }
            });
        }else if(mapSameNameToArray){
            selected.forEach((s) => {
                if(!payload[s.name]) payload[s.name] = [];
                payload[s.name].push(s.value);
            });
        }else{
            selected.forEach((s) => payload[s.name] = s.value);
        }

        onChange?.(JSON.parse(JSON.stringify(payload)));
    }, [selected, search]);

    useEffect(()=>{
        if(!items) return;
        setOptions(items.map((item, i)=>({
            ...item,
            id: uuid4(),
            list: item.list.map((itm, ii)=>({
                ...itm,
                id: uuid4()
            }))
        })));
    }, [items]);

    useEffect(() => {
        if(!items) return;
        if (process.env.NODE_ENV !== 'development') return;

        items.forEach((item) => {
            if (!Array.isArray(item.list)) {
                console.error("GlobalSearchFilter: `list` must be an array");
                return;
            }

            item.list.forEach((opt) => {
                if (!opt?.title || !opt?.name) {
                    console.error('Invalid filter option title and name is required but found: ', opt);
                }
            });
        });
    }, [items]);

    useEffect(()=>{
        const clicked = () =>setShowFilters(false);
        window.addEventListener('click', clicked);
        return ()=> window.removeEventListener('click', clicked);
    }, []);

    return (
        <div onClick={(e)=>e.stopPropagation()} className={className}>
            <div className="d-flex gap-3 w-100 text-nowrap">
                <motion.div
                    className={`btn-group border w-100 ${showFilters || alwaysOpen ? 'rounded-bottom-0' : ''}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <GlobalSearch
                        onChange={onSearch}
                        className="form-control"
                        parentClassName="border-0"
                        placeholder={placeholder || 'Search...'}
                        name={name || 'search'}
                    />

                    {!isMobile && options.length > 0 && !alwaysOpen && (
                        <button
                            onClick={() => setShowFilters((p) => !p)}
                            className={`d-flex align-items-center gap-2 btn border-start border-0 ${showFilters ? 'bg-light' : ''}`}
                        >
                            <FiFilter className="text-secondary" />
                            <small className="text-muted">Filter</small>
                            {selected.length > 0 && (
                                <span className="bg-primary rounded-circle p-1"></span>
                            )}
                        </button>
                    )}
                </motion.div>
                {buttons && (
                    <div className="d-none d-md-flex gap-2">
                        {buttons.map((btn, key)=>(
                            <button
                                onClick={btn.onClick}
                                className={`${btn.className || ''} d-flex align-items-center gap-2 px-3 border btn rounded ${
                                    showFilters || alwaysOpen ? 'rounded-bottom-0' : ''
                                }`}
                                key={`${location.pathname}-${btn.title}-${key}`}
                            >
                                <btn.icon />
                                {btn.title}
                            </button>
                        ))}
                    </div>
                )}
                {buttons && (
                    <div className="d-block d-md-none dropdown">
                        <button className={`btn border h-100 text-muted px-1 ${showFilters || alwaysOpen ? 'rounded-bottom-0' : ''}`} data-bs-toggle="dropdown">
                            <FaEllipsisVertical />
                        </button>
                        <ul className="dropdown-menu">
                            {buttons.map((btn, key)=>(
                                <li
                                    onClick={btn.onClick}
                                    className="dropdown-item d-flex align-items-center gap-2"
                                    key={`${location.pathname}-${btn.title}-${key}`}
                                >
                                    <btn.icon />
                                    {btn.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {(showFilters || isMobile || alwaysOpen) && (
                <motion.div
                    className="d-flex flex-wrap gap-2 small px-2 py-3 border border-top-0 rounded-bottom-3 shadow-sm bg-white position-relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ zIndex: 1 }}
                >
                    {options.map((item) => (
                        <div className="w-100" key={item.id}>
                            {item.title && (
                                <div className="small text-muted mb-1">
                                    {item.title}
                                </div>
                            )}

                            <div className="d-flex gap-2 overflow-auto flex-sm-wrap">
                                {item.list.map((filter, i) => {
                                    const isSelected = selectedMap.has(filter.id);
                                    return (
                                        <motion.button
                                            onClick={() => onSelect(filter)}
                                            className={`btn btn-sm rounded-3 px-3 btn-${
                                                isSelected ? 'primary' : 'light'
                                            } text-nowrap position-relative`}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03 }}
                                            key={filter.id}
                                        >
                                            <div className="small">
                                                {filter.title}
                                            </div>

                                            {isSelected && (
                                                <div className="position-absolute top-0 end-0">
                                                    <BiCheck className="text-success border border-success rounded-circle bg-light" />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
