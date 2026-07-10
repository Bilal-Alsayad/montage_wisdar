import { useEffect, useRef, useState } from "react";

interface TitleAnimationProps {
    text: string;
    fontFamily: string;
    bottom: number;
    backgroundColor?: string;
}

export default function TitleAnimation({ text, fontFamily, bottom, backgroundColor = "#BBAA99" }: TitleAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lines, setLines] = useState<string[] | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.clientWidth;

        const tempSpan = document.createElement("span");
        tempSpan.style.font = `60px ${fontFamily}`;
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        document.body.appendChild(tempSpan);

        const words = text.split(" ");
        const resultLines: string[] = [];
        let currentLine = "";

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            tempSpan.textContent = testLine;

            if (tempSpan.offsetWidth > containerWidth && currentLine) {
                resultLines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) resultLines.push(currentLine);

        document.body.removeChild(tempSpan);
        setLines(resultLines);
    }, [text, fontFamily]);

    const baseStyle: React.CSSProperties = {
        position: "absolute",
        bottom,
        left: 0,
        fontFamily,
        fontSize: 60,
        width: "100%",
        color: "#FFFFFF",
        textAlign: "center",
        direction: "ltr",
    };

    // أول رندر - لقياس العرض فقط
    if (!lines) {
        return <div ref={containerRef} style={{ ...baseStyle, visibility: "hidden" }}>
            {text}
        </div>;
    }

    return <div ref={containerRef} style={{
        ...baseStyle,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }}>
        {lines.map((line, index) => (
            <span key={index} style={{
                ...(index === lines.length - 1 ? { backgroundColor, padding: "0 20px" } : {}),
            }}>
                {line}
            </span>
        ))}
    </div>;
}