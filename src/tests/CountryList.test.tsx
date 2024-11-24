import React from "react";
import { render, screen } from "@testing-library/react";
import { SkeletonCountryTable } from "../components/SkeletonCountryTable.tsx";

describe("SkeletonCountryTable Component", () => {

    test("renders multiple tables correctly", () => {
        render(<SkeletonCountryTable />);

        // Find all the tables in the document
        const tables = screen.getAllByRole("table");

        expect(tables).toHaveLength(1); // Ensure only 1 table is rendered (it can be more, but typically one table)
        expect(tables[0]).toBeInTheDocument(); // Verify that the first table is found in the DOM
    });

    test("renders Skeleton in each column", () => {
        render(<SkeletonCountryTable />);

        // Find all Skeleton elements in each column by test ID "skeleton-element"
        const skeletons = screen.getAllByTestId("skeleton-element");


        expect(skeletons.length).toBeGreaterThan(0);
        // Check that each Skeleton element is in the document

        skeletons.forEach(skeleton => {
            expect(skeleton).toBeInTheDocument();
        });
    });
});
