import { createContext, useLayoutEffect, useState } from "react";

//create the context opbject
export const CryptoContext = createContext({});

//create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();
  const [coinData, setCoinData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9321);
  const [perPage, setPerPage] = useState(10);

  const getCryptoData = async () => {

    setCryptoData()

    try {
      // using total Coin URL from coingeko API
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/list?include_platform=true`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log(data);
      setTotalPages(data.length);
    } catch (error) {
      console.log(error);
    }

    try {
      // using coins/market URL from coingeko API
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=8`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("CoinData", data);
      setCryptoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoinData = async (coinid) => {
    setCoinData();
        try {
      // using coins/market URL from coingeko API
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchResult = async (query) => {
    try {
      // using coins/market URL from coingeko API
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log(data);
      setSearchData(data.coins);
    } catch (error) {
      console.log(error);
    }
  };


  const resetFunction = () => {
    setPage(1);
    setCoinSearch("")
  }


  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        resetFunction,
        setPerPage,
        perPage,
        getCoinData,
        coinData
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
