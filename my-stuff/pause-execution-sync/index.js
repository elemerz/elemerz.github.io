async function testSync() {
    console.log("Start, waiting 5 seconds...");
    console.time("Promise");
    await new Promise(done => setTimeout(() => done(), 5000));
    console.log("End. Should appear only after 5 seconds");
    console.timeEnd("Promise");
}