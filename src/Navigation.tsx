import React from "react";

export default function Navigation() {
  const [open, setOpen] = React.useState<{ [key: string]: boolean }>({
    iframe1: false,
    iframe2: false,
    iframe3: false,
  });
  const [customLinks, setCustomLinks] = React.useState<string[]>([]);

  React.useEffect(() => {
    const storedLinks = localStorage.getItem("customLinks");
    if (storedLinks) {
      setCustomLinks(JSON.parse(storedLinks));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("customLinks", JSON.stringify(customLinks));
  }, [customLinks]);

  const addCustomLink = (link: string) => {
    setCustomLinks((prevLinks) => [...prevLinks, link]);
  };

  const iframeVisibility = (key: string) => {
    setOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const fetchFavicon = async (url: string) => {
    try {
      const response = await fetch(`https://www.google.com/s2/favicons?domain=${url}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching favicon:", error);
      return "";
    }
  };
  fetchFavicon;

  return (
    <>
      <div>Navigation</div>
      {["https://example.com","https://example.com", "https://example.com"].map(
        (url, index) => (
          <div key={`iframe-${index}`}>
            <img
              src={`https://www.google.com/s2/favicons?domain=${url}`}
              alt="Favicon"
              onClick={() => iframeVisibility(`iframe${index + 1}`)}
            />
            {open[`iframe${index + 1}`] && (
              <iframe
                src={url}
                style={{
                  border: "none",
                  width: open[`iframe${index + 1}`] ? "300px" : "0px",
                }}
              ></iframe>
            )}
          </div>
        )
      )}
      {customLinks.map( (customLink, index) => {
        
        return (
          <div key={`custom-${index}`}>
            <img
              src={`https://www.google.com/s2/favicons?domain=${customLink}`}
              alt="Favicon"
              onClick={() => iframeVisibility(customLink)}
            />
            {open[customLink] && (
              <iframe
                src={customLink}
                title={customLink}
                style={{
                  border: "none",
                  width: open[customLink] ? "300px" : "0px",
                }}
              ></iframe>
            )}
          </div>)
        
      })}
      <input type="text" id="customLinkInput" />
      <button
        onClick={() => addCustomLink((document.getElementById("customLinkInput") as HTMLInputElement).value)}
      >
        Add Custom Link
      </button>
    </>
  );
}
 