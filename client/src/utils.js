function formatNumber(n) {
    if (n === null || n === undefined) return "N/A";

    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    });

    return formatter.format(n);
}

function getParams(m) {
    if (!m) return "N/A";

    // Handles both new schema (is_moe) and fallback legacy schema (isMoE)
    const isMoE = m.is_moe ?? m.isMoE;
    const total = m.total_parameters_b ?? m.totalParams;
    const active = m.active_parameters_b ?? m.activeParams;

    if (total === undefined || total === null) return "N/A";

    return isMoE ? `${total}B-A${active}B` : `${total}B`;
}

export { formatNumber, getParams };
