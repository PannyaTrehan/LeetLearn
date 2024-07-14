import { Route, Routes } from "react-router-dom";
import { Home, Stats, Explore, Add, Signup, Signin} from "./index.ts";

function AllRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/add" element={<Add />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
    )
}

export default AllRoutes