import { UserNav } from "./UserNav";

export const AppHeader = () => (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
            <UserNav />
        </div>
    </div>)