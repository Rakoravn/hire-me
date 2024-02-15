import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [checkKids, setCheckedKids] = useState([]);
  const [unCheckKids, setUnCheckedKids] = useState([]);

  useEffect(() => {
    const getPupils = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (!response.ok) {
          console.error("Failed fetching data from URL");
          return;
        }
        const data = await response.json();
        checkKidStatus(data.children);
      } catch (error) {
        console.error("Failed fetching data:", error);
      }
    };
    getPupils();
  }, []);

  const checkKidStatus = async (allKids) => {
    for (let i = 0; i < allKids.length; i++) {
      if (allKids[i].checkedIn) {
        setCheckedKids((prevKids) => [...prevKids, allKids[i]]);
      } else {
        setUnCheckedKids((prevKids) => [...prevKids, allKids[i]]);
      }
    }
  };

  const changeCheckInStatus = (kid) => {
    if(kid){
      kid.checkedIn = !kid.checkedIn;
      if(kid.checkedIn){
        setCheckedKids(prevKid => [...prevKid, kid])
        setUnCheckedKids(prevKid => prevKid.filter(item => item != kid))
      } else {
        setUnCheckedKids(prevKid => [...prevKid, kid])
        setCheckedKids(prevKid => prevKid.filter(item => item != kid))
      }
    }
  };

  return (
    <div className="App">
      <nav className="nav-bar">
        <p>Hire Me - A technical assignment made by Hassan for Famly</p>
      </nav>
      <header className="App-header">
        <div className="check-in-out-container">
          <div className="check-in-out-main">
            <div className="check-in-out-header">
              <p>Not Checked-In: ({unCheckKids.length})</p>
            </div>
            <div className="check-in-out-sub-container">
              {unCheckKids && unCheckKids.map((kid, index) => (
                <div
                  className="kid-container"
                  onClick={() => changeCheckInStatus(kid)}
                  key={index}
                >
                  {kid.name.fullName}
                </div>
              ))}
            </div>
          </div>
          <div className="check-in-out-main">
            <div className="check-in-out-header">
              <p>Checked-In: ({checkKids.length})</p>
            </div>
            <div className="check-in-out-sub-container">
              {checkKids && checkKids.map((kid, index) => (
                <div
                  className="kid-container"
                  onClick={() => changeCheckInStatus(kid)}
                  key={index}
                >
                  {kid.name.fullName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
