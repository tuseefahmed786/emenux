import React, { useEffect, useState } from 'react';
import axios from '../../../api/api';
import { useDispatch } from 'react-redux';
import { setBillingTrail } from '../../../redux/slice/infoSlice';
import Isloading from '../../../components/Isloading';
const Billing = () => {
    const [billingData, setBillingData] = useState(null); // Change to `null` for an object
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        const paymentHistory = async () => {
            try {
                const getData = await axios.get('/paymentDetails', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${token}`
                    }
                });
                setBillingData(getData.data.data);
                dispatch(setBillingTrail(getData.data.subscriptionStatus))
            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };
        paymentHistory();

    }, []);

    if (loading) {
        return <Isloading width="w-14" height="h-14" />;
      }

    return (
        <div className="w-full h-full bg-white">
            <div className="px-3 py-3">
                <h1>Billing History</h1>
                <p className="text-xs">Download Previous Invoice</p>
            </div>
            <div>
                <div className="pt-2">
                    <div className="border-b-2 border-[#9ca3af5e]">
                        <div className="flex justify-between px-4 py-3">
                            <p className="font-medium text-xs">Invoice</p>
                            <p className="font-medium hidden sm:flex  text-xs">Billing Admin</p>
                            <p className="font-medium hidden sm:flex  text-xs">Billing Amount</p>
                            <p className="font-medium text-xs">Download</p>
                        </div>
                    </div>
                </div>

                {billingData ? (
                    billingData.map((billingData,i) => {
                        return (
                            <div key={i} className="flex justify-between items-center px-4 py-3">
                                <img src="https://res.cloudinary.com/dlefxmkgz/image/upload/v1734309053/gfefcgm6ucelgv73caou.png" alt="invoice" width={36} />
                                <div className='hidden sm:flex flex-col'>
                                    <p className="font-medium text-xs">
                                        {billingData.customerName}
                                    </p>
                                    <p className="font-medium text-xs">{billingData.email}</p>
                                </div>
                                <p className="hidden sm:flex font-medium text-xs">{billingData.amount} {billingData.currency} </p>
                                <p className="font-medium text-xs">
                                    <a
                                        href={billingData.invoiceId} // Replace with the actual URL format if needed
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className='border py-2 px-3 border-gray-600 rounded-lg bg-transparent '
                                    >
                                        Download

                                    </a>
                                </p>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex w-full justify-center py-3">
                        <p className="text-sm">No Billing History Found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Billing;
