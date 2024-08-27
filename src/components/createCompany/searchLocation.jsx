import {useEffect} from "react";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover} from "@reach/combobox";

export function SearchLocation({location, className, name, style, setLocation, initialValue}) {
    const {value, suggestions: {status, data}, setValue, clearSuggestions,} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 9.082, lng: () => 8.6753,},
            radius: 200 * 1000,
        }
    });
    useEffect(() => setValue(initialValue, false), [initialValue, setValue])
    return (
        <Combobox
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    setLocation({address, lat, lng, formatted_address: results[0].formatted_address});
                } catch (error) {
                }
            }}
        >
            <div className="my-0 pb-0">
                <ComboboxInput
                    className={"form-control" + className}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // disabled={!ready}
                    placeholder={initialValue ? initialValue : "Enter new location"}
                />
                {status && (
                    <ComboboxPopover className="dropdown-menu list-index empty d-block">
                        {status === "OK" &&
                        data?.map(({id, description}) => (
                            <ComboboxOption className="dropdown-item list-index fs-16 " key={id} value={description}/>
                        ))}
                    </ComboboxPopover>
                )}
            </div>
        </Combobox>
    );
}