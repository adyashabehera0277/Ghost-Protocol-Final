// NetworkMap.jsx – draws the clickable network map for the Firewall Challenge.
// It only DRAWS. The game logic lives in FirewallChallenge.jsx.
export default function NetworkMap({ map, route, onNodeClick, locked }) {
  const nodeById = {};
  map.nodes.forEach((node) => {
    nodeById[node.id] = node;
  });

  const visited = new Set(route);

  // Remember which connections the route uses so we can light them up
  const usedEdges = new Set();
  for (let i = 0; i < route.length - 1; i++) {
    usedEdges.add(`${route[i]}|${route[i + 1]}`);
    usedEdges.add(`${route[i + 1]}|${route[i]}`);
  }

  function kindOf(id) {
    if (id === map.start) return "start";
    if (id === map.target) return "target";
    if (map.blocked.includes(id)) return "blocked";
    return "device";
  }

  const glyphs = { start: "▶", target: "★", blocked: "✕", device: "◆" };

  return (
    <svg className="net-map" viewBox="0 0 600 330" role="group" aria-label="Network map">
      {/* Connections */}
      {map.edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodeById[a].x}
          y1={nodeById[a].y}
          x2={nodeById[b].x}
          y2={nodeById[b].y}
          className={`net-edge ${usedEdges.has(`${a}|${b}`) ? "used" : ""}`}
        />
      ))}

      {/* Devices */}
      {map.nodes.map((node) => {
        const kind = kindOf(node.id);
        const active = visited.has(node.id);

        function activate() {
          if (!locked) onNodeClick(node.id);
        }

        return (
          <g
            key={node.id}
            className={`net-node ${kind} ${active ? "active" : ""}`}
            transform={`translate(${node.x}, ${node.y})`}
            onClick={activate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                activate();
              }
            }}
            tabIndex={locked ? -1 : 0}
            role="button"
            aria-label={`${node.label}${kind === "blocked" ? " (blocked by firewall)" : ""}`}
          >
            <circle r="22" />
            <text className="net-glyph" y="5" textAnchor="middle">
              {glyphs[kind]}
            </text>
            <text className="net-label" y="42" textAnchor="middle">
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}