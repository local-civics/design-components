import React              from "react";
import {Outlet}           from "react-router-dom";
import {NavigationBar}    from "../navigation-bar";
import {ExploreComponent} from "./component";

/**
 * Explore page
 * @constructor
 */
export const ExplorePage = () => {
    // const navigate = useNavigate();
    // const params = useParams();
    return (
        <main className="h-screen bg-white font-proxima">
            <NavigationBar page="explore" />
            <ExploreComponent
                isLoading={false}
                onPathwayClick={() => {}}
            />
            <Outlet />
        </main>
    );
};