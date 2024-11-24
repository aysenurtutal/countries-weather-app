//Skelaton Data Table Component added for better UI experience

import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Skeleton} from "primereact/skeleton";
import React from "react";

const items: any = Array.from({ length: 17 }, (v, i) => i);

export const SkeletonCountryTable: React.FC<any> = () => {
    return (
        <DataTable data-testid="table" value={items} className="p-datatable-striped">
            <Column field="details" header="Details" style={{ width: '10%', height: '100%' }} body={<Skeleton data-testid="skeleton-element"  />}></Column>
            <Column field="name" header="CountryName" sortable style={{ width: '20%', height: '100%' }} body={<Skeleton data-testid="skeleton-element"  />}></Column>
            <Column field="capital" header="Capital" sortable style={{ width: '25%', height: '100%' }} body={<Skeleton data-testid="skeleton-element"  />}></Column>
            <Column field="awsRegion" header="Region" sortable style={{ width: '20%', height: '100%' }} body={<Skeleton data-testid="skeleton-element"  />}></Column>
            <Column field="languagesField" header="Languages" sortable style={{ width: '25%', height: '100%' }} body={<Skeleton data-testid="skeleton-element"  />}></Column>
        </DataTable>
    );
}
