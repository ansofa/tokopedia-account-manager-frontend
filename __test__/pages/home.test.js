import datamock from "@/__mocks__/datamock";
import Home from "@/app/(service)/page";
import { render,screen } from "@testing-library/react";

describe("Home",()=>{
    it("[+] Home render",()=>{
        render(<Home />)
    })
})