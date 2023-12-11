import { UserNav } from "@/components/user-nav";
import GlobalContext from "@/contexts/GlobalContext";
import { render, screen } from "@testing-library/react";

const customRender = (component, {providerProps, ...renderOptions} = {}) => {
    return render(
        <GlobalContext.Provider {...providerProps} >
        {component}
        </GlobalContext.Provider>,
        renderOptions
        
    )
}

describe("UserNav", () => {
    it("[+] UserNav render", () => {

        const providerProps = {
            value : {
                userAuthenticated : true
            }
        }

        customRender(<UserNav />, {providerProps})

    })
})