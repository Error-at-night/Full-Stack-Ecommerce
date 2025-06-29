import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigator } from "../utils/helpers/navigate";

function NavigateHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    setNavigator(navigate)
  }, [navigate])

  return null
}

export default NavigateHandler
