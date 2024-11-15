//sending data using Custom fixtures
import {test as baseTest} from '@playwright/test';
import { Interface } from 'readline';

interface TestDataForOrder
{
    username: string;
    password: string;
    productName: string;
};
export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    testDataForOrder : {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "Zara Coat 4"
    }
})