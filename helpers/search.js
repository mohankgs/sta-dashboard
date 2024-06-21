export const Search = (data, searchQuery) => {

  const searchedData = data.filter(element => {
    const teamName = element.crew ? element.crew.CrewName : "";
    return element.RegisteredName.toLowerCase().includes(searchQuery.toLowerCase()) || teamName.toLowerCase().includes(searchQuery.toLowerCase());
  })

  return searchedData;

}