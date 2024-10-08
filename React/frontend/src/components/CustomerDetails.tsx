import {ItemData} from "./CartItem.tsx";
import {Button, Input, VStack} from "@chakra-ui/react";
import {useState} from "react";

interface CustomerDetailsProp {
    data: ItemData[];
    endpoint: string;
    mode: string;  // Add this line to include `mode`
}

function CustomerDetails(props: CustomerDetailsProp) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value)
    }



    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value)
    }

    const initiatePayment = () => {
        fetch(process.env.VITE_SERVER_BASE_URL + props.endpoint, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: props.data.map(elem => ({name: elem.name, id: elem.id})),
                customerName: name,
                customerEmail: email,
            })
        })
            .then(r => r.text())
            .then(r => {
                window.location.href = r
            })

    }

    return <>
        <VStack spacing={3} width={'xl'}>
            <Input variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange} value={name}/>
            <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange} value={email}/>
            <Button onClick={initiatePayment} colorScheme={'green'}>Checkout</Button>
        </VStack>
    </>
}

interface CustomerDetailsProp {
    data: ItemData[]
    endpoint: string
}

export default CustomerDetails
