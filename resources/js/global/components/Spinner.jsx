export const Spinner = ({show, absolute, color, bg, md}) =>{
    if(!show) return null;
    return(
        <div className={`bg-${bg ? bg : 'secondary'} bg-opacity-10 d-flex align-items-center justify-content-center w-100 position-${absolute ? 'absolute ' : 'fixed v'}h-100 top-0 start-0`} style={{zIndex: 1051}}>
            <div className={`spinner-border spinner-border-${absolute && !md ? 'sm' : 'md'} text-${color || 'primary'}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}