import React from 'react';

export function History() {
  const [quote, setQuote] = React.useState([]);
  const [author, setAuthor] = React.useState([]);
  const [year, setYear] = React.useState([new Date().getFullYear()]);
  const [flavors, setFlavors] = React.useState([]);
  React.useEffect(() => {
    let url = 'https://api.quotable.io/random';
    fetch(url)
    .then((response) => response.json())
    .then((quoteData) => {
        setQuote(quoteData.content);
        setAuthor(quoteData.author);
    });    
    // let quoteData = await response.json();
    // setQuote(quoteData.content);
    // setAuthor(quoteData.author);
  }, []);

  const onChange = (e) => {
    setYear(e.target.value);
    // const flavorRows = [];
    // for(flavor of flavors){
    //     flavorRows.push(
    //         <li className='list-group-item'>
    //             {flavor.flavor} +  "-" + {flavor.category}
    //         </li>
    //     )
    // }
    // console.log(flavorRows);
  }

  React.useEffect(() => {
    console.log("/api/flavors/" + year);
    fetch("/api/flavors/" + year)
    .then((response) => response.json())
    .then((yearFlavors) => {
        const flavorRows = [];
        for(const [i, flavor] of yearFlavors.entries()){
            flavorRows.push(
                <li className='list-group-item'>
                    {flavor.flavor} - {flavor.category}
                </li>
            )
        }
        setFlavors(flavorRows);

    }); 
}, [year]);




  return (
    <main>
    <h1>History</h1>
    <div>
        <span id="quote">{quote}</span>
        <i id="author">{author}</i>
    </div>
    <nav className="navbar bg-light">
        <label htmlFor="year">Year:</label>
        <div className="input-group">
            <select className="form-select" aria-label="Default select example" id="year" onChange={(e) => onChange(e)}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
        </div>
    </nav>
    <div>
        <ul id="flavors" className="list-group">
            {flavors}
          </ul>
    </div>
</main>
  );
}