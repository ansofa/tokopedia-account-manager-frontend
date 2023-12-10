import datamock from "@/__mocks__/datamock";
import { Input } from "@/components/ui/input";
import { render, screen } from "@testing-library/react";

describe("Input", () => {
    it("[+] Input render", () => {
        render(<Input />)
    })    
})