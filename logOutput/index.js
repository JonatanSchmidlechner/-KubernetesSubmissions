
const randomString = Math.random().toString(36);

const printRandomStringIntervally = () => {
    console.log(`${new Date().toISOString()}: ${randomString}`);

    setTimeout(printRandomStringIntervally, 5000);
}
printRandomStringIntervally();
