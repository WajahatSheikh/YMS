// Graph geometry for the process journey (viewBox 0 0 1000 160), shared by the
// server-rendered graph (HowItWorks.tsx) and the interactive nodes
// (ProcessJourney.tsx). Nodes sit over the centre of each card column and climb
// left to right — it shows progress, not a literal metric.
export const NODES = [
    { x: 125, y: 128 },
    { x: 375, y: 98 },
    { x: 625, y: 62 },
    { x: 875, y: 28 }
];

export const GRAPH_PATH = (() => {
    const pts = [{ x: 0, y: 148 }, ...NODES, { x: 1000, y: 14 }];
    let d = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const h = (b.x - a.x) / 2;
        d += ` C${a.x + h} ${a.y} ${b.x - h} ${b.y} ${b.x} ${b.y}`;
    }
    return d;
})();
