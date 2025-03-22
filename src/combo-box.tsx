import React, {useState, useEffect, useRef} from "react";


interface ComboBoxProps {
  options: string[];
  onSelect: (selected: string) => void;
}

export const ComboBox = ({options, onSelect}: ComboBoxProps) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [showDropDown, setShowDropDown] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(inputValue === ""){
      setFilteredOptions([])
      setShowDropDown(false)
    } else {
      const filtered = options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
      setFilteredOptions(filtered)
      setShowDropDown(filtered.length > 0)
    }
  }, [inputValue, options])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => prev < filteredOptions.length - 1 ? prev + 1: prev)
            break
      case "ArrowUp":
        setHighlightedIndex((prev) => prev > 0 ? prev - 1 : 0)
            break
      case "Enter":
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          selectedOption(filteredOptions[highlightedIndex])
        }
        break
      case "Escape":
        setShowDropDown(false)
            break
    }
  }

  const selectedOption = (option: string) => {
    setInputValue(option)
    onSelect(option)
    setShowDropDown(false)
  }

  const handleBlur = () => {
    setTimeout(() => setShowDropDown(false), 200)
  }

  return (
      <div onBlur={handleBlur} className="combo-box">
        <input
            type="text"
            name="search"
            id="search"
            className="combo-box-input"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-expanded={showDropDown}
            aria-controls="combo-box-options"
            placeholder="Search..."
            autoComplete="off"/>

        {showDropDown && (
            <ul id="combo-box-options" className='combo-box-options'>
              {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                      <li key={index} onMouseDown={() => selectedOption(option)} id="list-items" className={`combo-box-option ${
                          highlightedIndex === index ? "highlighted" : ""
                      }`}>
                        {option}
                      </li>
                  ))
              ):(
                  <li className="combo-box-no-results">No result</li>
              )}
            </ul>
        )}
      </div>
  );
};
