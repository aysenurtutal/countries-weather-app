import React, {useEffect, useRef, useState} from 'react';
import {GET_COUNTRIES} from "../grapql/queries.ts";
import {useQuery} from "@apollo/client";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {FaDirections, FaEye} from 'react-icons/fa';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {getCountryDetails, getFlag} from "../services/CountryService.ts"
import {getWeather} from "../services/WeatherService.ts";
import CountryModal from "../core/modals/CountryDetailsDialog.tsx";
import {SelectedCountry} from "../core/models/SelectedCountryDto.ts";
import {SkeletonCountryTable} from "./SkeletonCountryTable.tsx";
import {CountryData, CountryGeneralData} from "../core/models/CountryDataDto.ts";
import {WeatherInfo} from "../core/models/WeatherInfoDto.ts";
import {CountryListEnum} from "../core/enum/Enum.ts";
import {useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";
import {Filter} from "../core/utils/helpers.ts";

const CountryList: React.FC = () => {
    // countries receive from query
    const { data, loading, error } = useQuery(GET_COUNTRIES);

    const [allFlags, setAllFlags] = useState<{ [key: string]: string }>({});
    const [allCountries, setAllCountries] = useState<CountryGeneralData[]>([]);

    const [loadingAllFlags, setLoadingFlags] = useState<boolean>(true);
    const [loadingAllDetails, setLoadingDetails] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const isLoading = loading || loadingAllFlags || loadingAllDetails;

    const [countryData, setCountryData] = useState<CountryData | null>(null);

    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchDetailsAndEnhance = async () => {
            if (data && data.countries) {

                const countryTablePromises = data.countries.map(async (country: CountryGeneralData) => {
                    const details = await getCountryDetails(country.name);

                    const flag = await getFlag(country.name);
                    return {
                        name: country.name,
                        capital: country.capital,
                        awsRegion: country.awsRegion,
                        // we are adding flags and languagesFields from details services to countries service to be filled country table
                        flags: flag,
                        languagesField: details?.languages ? Object.values(details.languages).join(", ") : "N/A",
                    };
                });

                const allCountriesTables = await Promise.all(countryTablePromises);

                const flagsMap = allCountriesTables.reduce((acc, country) => {
                    acc[country.name] = country.flags;
                    return acc;
                }, {} as { [key: string]: string });

                setAllCountries(allCountriesTables) // all countries with flags and languages
                setAllFlags(flagsMap) // all flags
                setLoadingFlags(false);
                setLoadingDetails(false);

            }
        };

        if(data) {
            fetchDetailsAndEnhance().then(() => {
            })
        }
    }, [data]);


    //for showing and routing to country details
    // routing only added for showing routing structure in the project
    const handleCountryClick = async (countryName: string, isModalRouting: boolean, capital: string) => {
        if(isModalRouting){
            setIsModalLoading(true);
                const oneCountryDetail: SelectedCountry | null = await getCountryDetails(countryName);
                const weather: WeatherInfo | null = await getWeather(capital);
                setCountryData({
                    selectedCountry: oneCountryDetail,
                    weatherInfo: weather
                });
                if (oneCountryDetail && weather ) {
                    setIsModalLoading(false);
                    setIsModalOpen(true);
                }else {
                    setIsModalOpen(false);
                    return  toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to fetch country or weather data',
                        life: 3000,
                    });
                }
        }else{
            const oneCountryDetail: SelectedCountry | null = await getCountryDetails(countryName);
            const weather: WeatherInfo | null = await getWeather(capital);
            setCountryData({
                selectedCountry: oneCountryDetail,
                weatherInfo: weather
            });
            if (oneCountryDetail && weather) {
                navigate(`/country/${countryName}`, {
                    state: { countryData: { selectedCountry: oneCountryDetail, weatherInfo: weather } }
                });
            } else {
                return  toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to fetch country or weather data',
                    life: 3000,
                });
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // language options for filter in country data table
    const languageOptions = Array.from(
        new Set(
            allCountries.flatMap((country) =>
                country.languagesField?.split(", ") || []
            )
        )
    ).map((language) => ({
        label: language,
        value: language,
    }));

    // region options for filter in country data table
    const uniqueRegions = Array.from(
        new Set(allCountries.map((country) => country.awsRegion))
    ).map((region) => ({
        label: region,
        value: region,
    }));


    // Define filters
    const [filters, setFilters] = useState({
        global: { value: '', matchMode: 'contains' } as Filter,
        name: { value: '', matchMode: 'contains' } as Filter,
        capital: { value: '', matchMode: 'contains' } as Filter,
        awsRegion: { value: '', matchMode: 'contains' } as Filter,
        languagesField: { value: '', matchMode: 'contains' } as Filter
    });

    const onLanguageFilterChange = (event: any) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            languagesField: {
                ...prevFilters.languagesField,  // Mevcut matchMode'u korur
                value: event.value
            }
        }));
    };

    const onRegionFilterChange = (event: any) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            awsRegion: {
                ...prevFilters.awsRegion,  // Mevcut matchMode'u korur
                value: event.value
            }
        }));
    };


    //Skeleton Component added for better UI experience
    if (isLoading ) {
        return <SkeletonCountryTable/>
    }

    return (
        <div>
            <DataTable<CountryGeneralData>
                value={allCountries}
                filters={filters}
                paginator
                rows={CountryListEnum.RowsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                emptyMessage="No countries found"
                filterDisplay="row" // Filters in a row
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column
                    style={{ width: '10%' }}
                    header="Details"
                    body={(rowData) => (
                        <>
                            <Button
                                icon={<FaDirections style={{ width: '20px', height: '20px', color: 'rgb(16,6,159)' }} />}
                                onClick={() => handleCountryClick(rowData?.name, false, rowData?.capital)}
                                className="p-button-rounded p-button-text"
                                style={{ padding: '5px' }}
                            />
                            <Button
                                icon={<FaEye style={{ width: '30px', height: '30px', marginRight: '5px', color: 'rgb(242,168,0)' }} />}
                                onClick={() => handleCountryClick(rowData?.name, true, rowData?.capital)}
                                className="p-button-rounded p-button-text"
                                style={{ padding: '5px' }}
                            />
                        </>
                    )}
                />
                <Column
                    style={{ width: '20%' }}
                    field="name"
                    header="Country Name"
                    sortable
                    filter
                    filterPlaceholder="Search by name"
                    body={(rowData) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={allFlags[rowData.name] || ''}
                                alt={`${allFlags[rowData.text]} flag`}
                                style={{ width: '40px', height: '30px', marginRight: '10px' }}
                            />
                            <span>{rowData.name}</span>
                        </div>
                    )}
                />
                <Column style={{ width: '25%' }} field="capital" header="Capital"
                        sortable filter filterPlaceholder="Search by capital" />
                <Column style={{ width: '20%' }}
                    field="awsRegion"
                    header="Region"
                    sortable
                    filter
                    filterPlaceholder="Search by region"
                    filterMatchMode="contains"
                    filterElement={
                        <Dropdown
                            value={filters.awsRegion?.value || null}
                            options={uniqueRegions}
                            onChange={onRegionFilterChange}
                            placeholder="Select a region"
                            filter
                            showClear
                        />
                    }
                />
                <Column style={{ width: '25%' }}
                    field="languagesField"
                    header="Languages"
                    sortable
                    filter
                    filterPlaceholder="Search by languages"
                    filterMatchMode="contains"
                    filterElement={
                        <Dropdown
                            value={filters.languagesField?.value || null}
                            options={languageOptions}
                            onChange={onLanguageFilterChange}
                            placeholder="Select a language"
                            filter
                            showClear
                        />
                    }
                />
            </DataTable>

            {
                isModalLoading &&
                <div className="loading-spinner">Loading...</div>
            }

            {countryData && (
                <CountryModal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    countryData={countryData}
                />
            )}

            {/*for error showing Toaster added*/}
            <Toast ref={toast} />
        </div>
    );
};


export default CountryList;
