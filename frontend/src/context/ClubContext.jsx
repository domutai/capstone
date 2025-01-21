import { createContext, useState, useContext } from 'react';

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);

  return (
    <ClubContext.Provider value={{ clubs, setClubs }}>
      {children}
    </ClubContext.Provider>
  );
};

export const useClubs = () => useContext(ClubContext);
