import React, { createContext, useEffect, useState } from "react";
import { useSnackbar } from './SnackbarContext';

export const AppContext = createContext();

export const AppProvider = (props) => {
  const { showSnackbar } = useSnackbar(); 
  const [CustomerData, setCustomerData] = useState([]);
  const [appData, setAppData] = useState({
    customers: [],
    packages: [],
    customerObj: {},
    packageObj: {},
  });
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
    showSnackbar("Customer deleted successfully");
  };

  //add new package
  const addPackage = (newPackage) => {
    setAppData((prevData) => ({
      ...prevData,
      packages: [...prevData.packages, newPackage],
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

        const packageObj = {};
        data.packages.forEach((element) => {
          const customerName = customerObj[element.customerid];
          packageObj[element.id] = {
            ...element,
            customerName,
          };
        });
        setCustomerData(data.customers);
        setAppData((prevData) => ({
          ...prevData,
          customers: data.customers,
          packages: Object.values(packageObj),
          customerObj,
          packageObj,
        }));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //-----------------------context invoice file ----------------------------------------------
  const getInvoiceByCustomerId = (customerId) => {
    const customer = appData.customers.find(
      (i) => i.id == parseInt(customerId)
    );
    // show total price and Weight for customer
    const packagesForCustomer = appData.packages.filter(
      (pkg) => pkg.customerid === parseInt(customerId)
    );

    // Calculate total price and total weight
    const totalWeight = packagesForCustomer.reduce(
      (total, pkg) => total + parseFloat(pkg.weight),
      0
    );
    const totalPrice = packagesForCustomer.reduce(
      (total, pkg) => total + parseFloat(pkg.price),
      0
    );
    return {
      customer,
      packagesForCustomer,
      totalWeight,
      totalPrice,
    };
  };

  //-----------------------context PackageList file ----------------------------------------------

  // Add new package
  const handleAddPackage = (newPackage) => {
    const updatedPackages = [
      ...appData.packages,
      { ...newPackage, shippingOrder: appData.packages.length + 1 },
    ];
    const sortedPackage = updatedPackages.sort((a,b) => a.shippingOrder - b.shippingOrder);

    setAppData((prevData) => ({
      ...prevData,
      packages: sortedPackage,
    }));

    //show snakbar
    showSnackbar('Package added successfully'); 
  };

  //handle Up and down buttons for packages
  const updateShippingOrder = (packages) => {
    return packages.map((pkg, index) => {
      return { ...pkg, shippingOrder: index + 1 };
    });
  };

  const moveRow = (currentIndex, newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    }
    if (newIndex >= appData.packages.length) {
      newIndex = appData.packages.length - 1;
    }

    const updatedPackages = [...appData.packages];
    const [movedItem] = updatedPackages.splice(currentIndex, 1);
    updatedPackages.splice(newIndex, 0, movedItem);
    const packagesWithUpdatedShippingOrder =
      updateShippingOrder(updatedPackages);
      setAppData((prevData) => ({
        ...prevData,
        packages: packagesWithUpdatedShippingOrder.map((pkg, index) => ({
          ...pkg,
          shippingOrder: index + 1,
        })),
      }));
    };
//customer
const handleCreateInvoice = () => {  
  showSnackbar("Invoice created successfully");
};
  return (
    <AppContext.Provider
      value={{
        appData,
        deleteCustomer,
        isLoading,
        addPackage,
        CustomerData,
        getInvoiceByCustomerId,
        handleAddPackage,
        moveRow,
        updateShippingOrder,
        handleCreateInvoice
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
