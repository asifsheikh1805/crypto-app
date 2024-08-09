import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import logo from "../logo.svg";
import Dropdown from "../components/Dropdown";
import { baseUrl } from "../endpoints";
import { defaultPairs } from "../constants";

const Header = forwardRef((props, ref) => {
  const { handleSelect, pair } = props;
  const [currencies, setcurrencies] = useState([]);
  let first = useRef(false); //for not subscribing to ws unless header is loaded

  useEffect(() => {
    let pairs = [];

    const apiCall = async () => {
      await fetch(baseUrl + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        // list for all crypto-USD pair
        // if (pair.quote_currency === "USD") {
        //   return pair;
        // }

        if (defaultPairs.includes(pair.id)) {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      setcurrencies(filtered);
      first.current = true;
    };

    apiCall();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        isComponentLoaded() {
          return first.current;
        },
      };
    },
    []
  );

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a
              href="#"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <img src={logo} className="h-6 mr-1" alt="Logo" />
              <span className="self-center whitespace-nowrap">Demo App</span>
            </a>
            <form className="max-w-sm mx-10">
              <Dropdown
                options={currencies}
                selectedValue={pair}
                handleSelect={handleSelect}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Header;
