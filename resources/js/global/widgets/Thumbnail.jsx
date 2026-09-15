import React, { useMemo, useState } from "react";

export const Thumbnail = ({
    document,
    className = "",
    style = {},
}) => {
    const [open, setOpen] = useState(false);

    const {
        originalName,
        mimeType,
        url,
        downloadUrl,
    } = document.attributes;

    const file = useMemo(() => {
        const isImage = mimeType?.startsWith("image/");
        const isPdf = mimeType === "application/pdf";

        const isOffice = [
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ].includes(mimeType);

        let icon = "📄";

        if (isPdf) {
            icon = "📕";
        } else if (
            mimeType?.includes("word") ||
            mimeType?.includes("document")
        ) {
            icon = "📝";
        } else if (
            mimeType?.includes("excel") ||
            mimeType?.includes("spreadsheet")
        ) {
            icon = "📊";
        } else if (
            mimeType?.includes("presentation") ||
            mimeType?.includes("powerpoint")
        ) {
            icon = "📈";
        }

        return {
            isImage,
            isPdf,
            isOffice,
            icon,
        };
    }, [mimeType]);

    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        url
    )}`;

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className={className}
                style={{
                    cursor: "pointer",
                    ...style,
                }}
                title={originalName}
            >
                {file.isImage ? (
                    <img
                        src={url}
                        alt={originalName}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 6,
                            display: "block",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#f3f4f6",
                            borderRadius: 6,
                            fontSize: 42,
                            userSelect: "none",
                        }}
                    >
                        {file.icon}
                    </div>
                )}
            </div>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,.75)",
                        zIndex: 99999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "95vw",
                            height: "90vh",
                            background: "#fff",
                            borderRadius: 8,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px 16px",
                                borderBottom: "1px solid #e5e7eb",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {originalName}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 8,
                                }}
                            >
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open
                                </a>

                                <a
                                    href={downloadUrl || url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Download
                                </a>

                                <button
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                overflow: "hidden",
                            }}
                        >
                            {file.isImage && (
                                <img
                                    src={url}
                                    alt={originalName}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        background: "#111827",
                                    }}
                                />
                            )}

                            {file.isPdf && (
                                <iframe
                                    title={originalName}
                                    src={url}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: "none",
                                    }}
                                />
                            )}

                            {file.isOffice && (
                                <iframe
                                    title={originalName}
                                    src={officeViewerUrl}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: "none",
                                    }}
                                />
                            )}

                            {!file.isImage &&
                                !file.isPdf &&
                                !file.isOffice && (
                                    <div
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 16,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 120,
                                            }}
                                        >
                                            {file.icon}
                                        </div>

                                        <div>{originalName}</div>

                                        <a
                                            href={
                                                downloadUrl || url
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Download File
                                        </a>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};