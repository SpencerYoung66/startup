import React from 'react';

export function Vote() {
    const [chocolate, setChocolate] = React.useState([]);
    const [fruit, setFruit] = React.useState([]);
    const [other, setOther] = React.useState([]);
    const [grand, setGrand] = React.useState([]);
    const [grandElemsState, setGrandElemsState] = React.useState([]);
    const [flavors, setFlavors] = React.useState([]);

    const onChange = (e) => {
        console.log("on change");
        let tmpGrand = grand.filter(i => i.category !== e.target.id);
        console.log(tmpGrand);
        console.log(flavors.filter(i => i.flavor === e.target.value));
        // setGrand(grand.filter(i => i.category !== e.target.id));
        // console.log(chocolate?.[0]);
        // const grandElems= [];
        // if(grand.length){
        //     for (const [i, flavor] of grand.entries()) {
        //         grandElems.push(
        //             <option value={flavor.flavor} className='list-group-item'>
        //             {flavor.flavor}
        //         </option>
        //         );
        //     }
        // }
        // setGrandElemsState(grandElems);
      }
    
    React.useEffect(() => {
        console.log("/api/flavors/" + new Date().getFullYear());
        fetch("/api/flavors/" + new Date().getFullYear())
        .then((response) => response.json())
        .then((yearFlavors) => {
            setFlavors(yearFlavors);
            const tempChocolate = yearFlavors.filter( i => i.category === "chocolate");
            setChocolate(tempChocolate);
            const tempFruit = yearFlavors.filter( i => i.category === "fruit");
            setFruit(yearFlavors.filter( i => i.category === "fruit"));
            const tempOther = yearFlavors.filter( i => i.category === "other");
            setOther(yearFlavors.filter( i => i.category === "other"));
            setGrand([tempChocolate?.[0], tempFruit?.[0], tempOther?.[0]]);

            const grandElems= [];
            console.log(grand);
            console.log(grand.length);
            if(grand.length){
                for (const [i, flavor] of grand.entries()) {
                    grandElems.push(
                        <option value={flavor.flavor} className='list-group-item'>
                        {flavor.flavor}
                    </option>
                    );
                }
            }
            setGrandElemsState(grandElems);
        }); 
    }, []);


    React.useEffect(() => {
        const grandElems= [];
        console.log(grand);
        console.log(grand.length);
        if(grand.length){
            for (const [i, flavor] of grand.entries()) {
                grandElems.push(
                    <option value={flavor.flavor} className='list-group-item'>
                    {flavor.flavor}
                </option>
                );
            }
        }
        setGrandElemsState(grandElems);
    }, [grand]);



    const chocolateElems= [];
    if(chocolate.length){
        for (const [i, flavor] of chocolate.entries()) {
            chocolateElems.push(
                <option value={flavor.flavor} className='list-group-item'>
                {flavor.flavor}
            </option>
            );
        }
    }

    const fruitElems= [];
    if(fruit.length){
        for (const [i, flavor] of fruit.entries()) {
            fruitElems.push(
                <option value={flavor.flavor} className='list-group-item'>
                {flavor.flavor}
            </option>
            );
        }
    }

    const otherElems= [];
    if(other.length){
        for (const [i, flavor] of other.entries()) {
            otherElems.push(
                <option value={flavor.flavor} className='list-group-item'>
                {flavor.flavor}
            </option>
            );
        }
    }





  return (
    <main>
    <h1>Vote for your Favorite Flavors!</h1>
    <span>Vote for your favorite flavor in each category. The Grand Prize must be one of the flavors you voted for in your category favorites.</span>
    <nav className="navbar bg-light">
        <form className="container-fluid">
            <label htmlFor="chocolate">Chocolate:</label>
            <div className="input-group">
                <select className="form-select" aria-label="Default select example" id="chocolate" onChange={(e) => onChange(e)}>
                    {chocolateElems}
                </select>
            </div>
            <label htmlFor="fruit">Fruit:</label>
            <div className="input-group">
                <select className="form-select" aria-label="Default select example" id="fruit" onChange={(e) => onChange(e)}>
                    {fruitElems}
                </select>
            </div>
            <label htmlFor="other">Other:</label>
            <div className="input-group">
                <select className="form-select" aria-label="Default select example" id="other" onChange={(e) => onChange(e)}>
                    {otherElems}
                </select>
            </div>
            <label htmlFor="grand">Grand Prize:</label>
            <div className="input-group">
                <select name="grand" id="grand" className="form-select" aria-label="Default select example" onChange={(e) => onChange(e)}>
                    {grandElemsState}
                </select>
            </div>
            {/* <button className="btn btn-outline-success me-2" type="button" onclick="vote()">Vote</button> */}
        </form>
    </nav>
</main>
  );
}