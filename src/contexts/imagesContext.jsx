import axios from "axios";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const ImagesContext = createContext();

const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currPage, setCurrPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const [showSeachHistory, setShowSeachHistory] = useState(false);

  const observer = useRef();

  //callback to set intersection observer to the last element in list
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //whenever search text is updated reset pagination index to 1
  useEffect(() => {
    setCurrPage(1);
  }, [searchText]);

  //construct image url from data
  const getFlickrImageURL = (photo, size) => {
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return {
      url,
      owner: photo.ownername,
      title: photo.title,
    };
  };

  //store current search history to localstorage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  //Get appropriate API Call parameters
  const getArguments = () => {
    const apiKey = process.env.REACT_APP_MY_FLICKR_KEY;
    return {
      method: searchText ? "flickr.photos.search" : "flickr.photos.getRecent",
      api_key: apiKey,
      text: searchText, // Search Text
      sort: "interestingness-desc",
      per_page: 16,
      license: "4",
      extras: "owner_name,license",
      format: "json",
      nojsoncallback: 1,
      page: currPage,
    };
  };

  //fetch images from API
  const fetchImages = () => {
    let cancelPrevRequest;
    setLoading(true);
    const parameters = new URLSearchParams(
      getArguments(searchHistory, currPage)
    );
    const apiURL = `https://api.flickr.com/services/rest/?${parameters}`;
    axios({
      method: "GET",
      url: apiURL,
      cancelToken: new axios.CancelToken((c) => {
        cancelPrevRequest = c;
      }),
    })
      .then((res) => {
        const imgUrls = res.data.photos.photo.map((photo) =>
          getFlickrImageURL(photo, "b")
        );
        if (res.data.photos.pages > currPage) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLoading(false);
        setError(undefined);
        setImages((prev) => [...prev, ...imgUrls]);
        if (searchText)
          setSearchHistory((prev) => [
            ...new Set([searchText, ...prev].slice(0, 10)),
          ]);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setLoading(false);
        setError(e);
      });
    return cancelPrevRequest;
  };

  //fetch new images whenever pageCount increases
  useEffect(() => {
    //cancel previous requests if multiple requests are made and only execute the latest request
    let cancelPrevRequest = fetchImages();
    return () => cancelPrevRequest();
  }, [currPage]);

  return (
    <ImagesContext.Provider
      value={{
        images,
        loading,
        error,
        lastElementRef,
        searchText,
        setSearchText,
        currentImage,
        setCurrentImage,
        showImageModal,
        setShowImageModal,
        searchHistory,
        searchImages: () => {
          setShowSeachHistory(false);
          setImages([]);
          fetchImages();
        },
        showSeachHistory,
        setShowSeachHistory,
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesProvider;
