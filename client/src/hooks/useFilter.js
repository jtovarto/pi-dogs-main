function useFilter() {
  const [filters, setFilters] = useFilter([]);

  const filterList = {
    byTemper: (array, temper) => {
      if (temper !== "all") return array.filter((item) => item.temperaments.includes(temper));
      return array;
    },
    bySource: (array, source) => {
      if (source === "db") return array.filter((item) => !isNaN(item.id));
      if (source === "api") return array.filter((item) => isNaN(item.id));
      return array;
    },
  };

  
}
