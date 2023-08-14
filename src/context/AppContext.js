import React, { createContext , useEffect, useState} from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [CustomerData , setCustomerData] = useState([]);
    const [ packageData , setPackageData] = useState([]);
    const [appData, setAppData] = useState({ customers: [], packages: [], customerObj: {}, packageObj: {} });
    const [isLoading, setIsLoading] = useState(false);
    //functions
    const deleteCustomer = (customerId) => {
      setAppData((prevData) => {
        // Filter out the deleted customer
        const updatedCustomers = prevData.customers.filter(
          (customer) => customer.id !== customerId
        );
    
        // Filter out packages associated with the deleted customer
        const updatedPackages = Object.values(prevData.packageObj).filter(
          (pkg) => pkg.customerid !== customerId
        );

        

        return {
          ...prevData,
          customers: updatedCustomers,
          packages: updatedPackages,
          customerObj: updatedCustomers.reduce(
            (obj, customer) => ({ ...obj, [customer.id]: customer.name }),
            {}
          ),
          packageObj: updatedPackages.reduce(
            (obj, pkg) => ({ ...obj, [pkg.id]: pkg }),
            {}
          ),
        };
      });
    };

    
        //add new package 
        const addPackage = (newPackage) =>{
          setAppData((prevData)=> ({
            ...prevData,
            packages: [...prevData.packages , newPackage],
          }));
        };
  
    //useEfeect from App component
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("/data.json");
          const data = await response.json();
  
          const customerObj = {};
          data.customers.forEach((customer) => {
            customerObj[customer.id] = customer.name;
          });
          setCustomerData(customerObj);
  
          const packageObj = {};
          data.packages.forEach((element) => {
            const customerName = customerObj[element.id];
            packageObj[element.id] = {
              ...element,
              customerName,
            };
          });
          setPackageData(packageObj);
  
          setAppData((prevData) => ({
            ...prevData,
            customers: data.customers,
            packages: Object.values(packageObj),
            customerObj,
            packageObj,
          }));
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <AppContext.Provider
        value={{
          appData,
          deleteCustomer,
          isLoading,
          addPackage,
          CustomerData,
        }}
      >
        {props.children}
      </AppContext.Provider>
    );
  };
  