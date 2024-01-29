import { useEffect, useState } from "react";
import { test } from "../api/Auth";
import { getPagesInfo } from "../api/Pages";

export const useQueryData = () => {
  const [pages, setPages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [marketId, setMarketId] = useState(null)
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const response = await test();
    setUserData(response.data);
    setUserId(response.data.user_id);
    setMarketId(response.data.market_id)
    setRoles(response.data.roles[0]);
    setLoading(null);
  };

  const loadPages = async () => {
    if (userId) {
      const response = await getPagesInfo(roles);
      setPages(response.data);
    }
  };

  useEffect(() => {
    loadData();
    loadPages();
  }, [userId]);

  return { userData, user_id: userId, market_id: marketId, loading, pages };
};
