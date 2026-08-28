function formatNumber(n) {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(n);
}

function getParams(m) {
  return m.isMoE
    ? `${m.totalParams}B-A${m.activeParams}B`
    : `${m.totalParams}B`;
}

export { formatNumber, getParams };
