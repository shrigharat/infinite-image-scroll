import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { ImagesContext } from "../../contexts/imagesContext";
import useClickOutside from "../../hooks/useClickOutside";
import "./Header.styles.scss";

const Header = () => {
  const {
    searchText,
    setSearchText,
    searchHistory,
    searchImages,
    showSeachHistory,
    setShowSeachHistory,
  } = useContext(ImagesContext);

  const searchHistoryRef = useRef();
  useClickOutside(searchHistoryRef, () => setShowSeachHistory(false));

  return (
    <header className="search-header">
      <h1>Search Photos</h1>
      <div className="search-container">
        <InputGroup position={"relative"} ref={searchHistoryRef}>
          <Input
            backgroundColor="#f1f1f1"
            borderRadius="2rem"
            placeholder="Enter keywords"
            _focus={{ outline: "none" }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            width="100%"
            className="search-input"
            onClick={() => setShowSeachHistory(true)}
            onFocus={() => setShowSeachHistory(true)}
            // onBlur={() => setShowSeachHistory(false)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setShowSeachHistory(false);
                searchImages();
              }
            }}
            spellCheck={false}
            value={searchText}
          />
          <InputRightElement
            onClick={() => searchImages()}
            children={<box-icon name="search-alt" color="#424242"></box-icon>}
          />
          {searchHistory.length > 0 && showSeachHistory && (
            <VStack
              zIndex={1}
              position="absolute"
              top="12"
              width={"100%"}
              backgroundColor="#eee"
              textAlign="left"
              borderRadius="4px"
              boxShadow="0 3px 16px 2px rgba(0,0,0,.4)"
              padding={".3rem 0"}
            >
              {React.Children.toArray(
                searchHistory.slice(0, 5).map((name) => (
                  <Box
                    zIndex={4}
                    display="flex"
                    width={"100%"}
                    _hover={{ backgroundColor: "#bdbdbd" }}
                    padding=".3rem .7rem"
                    onClick={(e) => {
                      setSearchText(name);
                    }}
                  >
                    {name}
                  </Box>
                ))
              )}
            </VStack>
          )}
        </InputGroup>
      </div>
    </header>
  );
};

export default Header;
