// DataContext.js
import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const jsonData = await api.loadData();
      setData(jsonData);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data && data.events) {
      setLast(data.events.sort((evtA, evtB) =>
        new Date(evtB.date) - new Date(evtA.date)
      )[0]);
      return;
    }
    getData();
  }, [data, getData]);

  const memoizedValue = useMemo(() => ({ data, error, last }), [data, error, last]);

  return (
    <DataContext.Provider value={memoizedValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
