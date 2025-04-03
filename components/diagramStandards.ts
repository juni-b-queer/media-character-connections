export const basicStyles = [
    {
        selector: 'node[type="sketch-node"]',
        style: {
            "background-color": "#ff007d",
            shape: "barrel",
            label: "data(label)",
            "width": "100%",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 0.5,
            "text-outline-color": "black",
            "font-size": "14px",
        },
    },
    {
        selector: 'node[type="character-node"]',
        style: {
            "background-color": "#ef9fc6",
            shape: "round-rectangle",
            label: "data(label)",
            "width": "100%",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 0.5,
            "text-outline-color": "black",
            "font-size": "14px",
        },
    },
    {
        selector: 'node[type="actor-node"]',
        style: {
            "background-color": "#f1d576",
            shape: "ellipse",
            label: "data(label)",
            "width": "100%",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 0.5,
            "text-outline-color": "black",
            "font-size": "14px",
        },
    },
    {
        selector: "edge",
        style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-shape": "triangle",
        },
    },
    {
        selector: "edge[type='actor-character-edge']",
        style: {
            width: 1,
            "line-color": "#ee7d7d",
            "target-arrow-color": "#ee7d7d",
            "target-arrow-fill": "filled",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.5,
            "curve-style": "bezier",
            "control-point-distances": 120,
            "control-point-weights": 0.1,
            label: "plays",
            "text-outline-width": 0.5,
            "color": "#fff",
            "font-size": "8px",
            "text-rotation": "autorotate"

        },
    },
    {
        selector: "edge[type='character-sketch-edge']",
        style: {
            width: 1,
            "line-color": "#7eb6f5",
            "target-arrow-color": "#7eb6f5",
            "target-arrow-fill": "filled",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.5,
            "curve-style": "bezier",
            "control-point-distances": 120,
            "control-point-weights": 0.1,
            label: "in",
            "text-outline-width": 0.5,
            "color": "#fff",
            "font-size": "8px",
            "text-rotation": "autorotate"

        },
    },
    {
        selector: "edge[type='character-connection-edge']",
        style: {
            width: 1,
            "line-color": "#7eb6f5",
            "target-arrow-color": "#7eb6f5",
            "target-arrow-fill": "filled",
            "target-arrow-shape": "triangle",
            "arrow-scale": 0.5,
            "curve-style": "bezier",
            "control-point-distances": 120,
            "control-point-weights": 0.1,
            label: "data(connectionType)",
            "text-outline-width": 0.5,
            "color": "#fff",
            "font-size": "8px",
            "text-rotation": "autorotate"

        },
    }
]

const temp =[
    {
        selector: 'node[type="season"]',
        style: {
            "background-color": "#ff4500",
            shape: "hexagon",
            label: "data(label)",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "black",
            "font-size": "12px",
            "width": "70px",
        },
    },
    {
        selector: 'node[type="episode"]',
        style: {
            "background-color": "#1e90ff",
            shape: "ellipse",
            label: "data(label)",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "black",
            "font-size": "12px",
        },
    },
    {
        selector: 'node[type="writer"]',
        style: {
            "background-color": "#ff69b4",
            shape: "triangle",
            label: "data(label)",
            "text-halign": "center",
            "text-valign": "center",
            "color": "#fff",
            "text-outline-width": 2,
            "text-outline-color": "black",
            "font-size": "12px",
        },
    },
    {
        selector: "edge[type='episode-sketch']",
        style: {
            width: 3,
            "line-color": "#78dedc",
            "target-arrow-shape": "triangle",
        },
    },
    {
        selector: "edge[type='episode-writer']",
        style: {
            width: 3,
            "line-color": "#fa09a6",
            "target-arrow-shape": "triangle",
        },
    }
]