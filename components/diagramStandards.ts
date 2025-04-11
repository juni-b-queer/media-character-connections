const textFormat = {
    "width": "120%",
    "text-halign": "center",
    "text-valign": "center",
    "color": "#d5a398",
    "text-outline-width": 1,
    "text-outline-color": "white",
    "font-size": "16px",
    "font-family": "Cooper Black",
    "font-style": "italic",
    "font-weight": "bold",
    "text-wrap": "wrap",
    "text-max-width": "100%",
}

const edgeFormat = {
    "arrow-scale": 1,
    "control-point-distances": 120,
    "control-point-weights": 0.1,
    "text-outline-width": 1,
    "color": "#fff",
    "font-size": "8px",
    "text-rotation": "autorotate"
}

export const basicStyles = [
    {
        selector: 'node[type="season-node"]',
        style: {
            "background-color": "#d6bd7b",
            shape: "barrel",
            label: "data(label)",
            ...textFormat
        },
    },
    {
        selector: 'node[type="episode-node"]',
        style: {
            "background-color": "#8ca98d",
            "height": "75%",
            shape: "barrel",
            label: "data(label)",
            ...textFormat
        },
    },
    {
        selector: 'node[type="sketch-node"]',
        style: {
            "background-color": "#b9a6bc",
            shape: "barrel",
            label: "data(label)",
            ...textFormat

        },
    },
    {
        selector: 'node[type="character-node"]',
        style: {
            "background-color": "#cc7cbb",
            shape: "round-rectangle",
            label: "data(label)",
            ...textFormat
        },
    },
    {
        selector: 'node[type="actor-node"]',
        style: {
            "background-color": "#d8707b",
            shape: "ellipse",
            label: "data(label)",
            ...textFormat
        },
    },
    {
        selector: 'node[type="writer-node"]',
        style: {
            "background-color": "#9eb0cb",
            shape: "ellipse",
            label: "data(label)",
            ...textFormat
        },
    },
    {
        selector: "edge",
        style: {
            width: 3,
            "line-color": "#ccc",
            // "target-arrow-shape": "triangle",
        },
    },
    {
        selector: "edge[type='character-actor-edge']",
        style: {
            width: 3,
            label: "plays",
            "line-color": "#ee7d7d",
            "source-arrow-color": "#ee7d7d",
            "source-arrow-fill": "filled",
            "source-arrow-shape": "triangle",
            "curve-style": "round-taxi",
            ...edgeFormat

        },
    },
    {
        selector: "edge[type='character-sketch-edge']",
        style: {
            width: 3,
            label: "in",
            "line-color": "#7eb6f5",
            "source-arrow-color": "#7eb6f5",
            "source-arrow-fill": "filled",
            "source-arrow-shape": "triangle",
            "curve-style": "round-taxi",
            ...edgeFormat

        },
    },
    {
        selector: "edge[type='character-connection-edge']",
        style: {
            width: 3,
            label: "data(connectionType)",
            "line-color": "#e85bd4",
            "target-arrow-color": "#e85bd4",
            "target-arrow-fill": "filled",
            "target-arrow-shape": "triangle",
            ...edgeFormat

        },
    },
    {
        selector: "edge[type='episode-sketch-edge']",
        style: {
            width: 3,
            label: "data(order)",
            "line-color": "#3c81d3",
            "target-arrow-color": "#3c81d3",
            "target-arrow-fill": "filled",
            "target-arrow-shape": "triangle",
            "curve-style": "round-taxi",
            ...edgeFormat

        },
    },
    {
        selector: "edge[type='writer-episode-edge']",
        style: {
            width: 3,
            label: "wrote",
            "line-color": "#db7dec",
            "target-arrow-color": "#db7dec",
            "curve-style": "round-taxi",
            ...edgeFormat

        },
    },{
        selector: "edge[type='season-episode-edge']",
        style: {
            width: 3,
            label: "",
            "line-color": "#ff966c",
            "target-arrow-color": "#ff966c",
            ...edgeFormat

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