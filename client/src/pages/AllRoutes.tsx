import { Route, Routes } from "react-router-dom";
import { Home, Stats, Explore, Add} from "./index.ts";

function AllRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/add" element={<Add />} />
        </Routes>
    )
}

export default AllRoutes