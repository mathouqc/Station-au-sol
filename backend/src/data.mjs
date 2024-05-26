import EventEmitter from 'node:events';

export default class MyData extends EventEmitter {
    stringDataBuffer = "";
    lastDataTime = Date.now();
    startDataTime = Date.now();

    apogee = 0;
    apogeeReached = false;
    apogeeTime = 0;

    constructor({
        'encoding': encoding = "utf-8",
        'lineEnding': lineEnding = '$',
        'dataInterval': dataInterval = 100,
    } = {}) {
        super();

        this.encoding = encoding;
        this.lineEnding = lineEnding;
        this.dataInterval = dataInterval;
    }

    // Extract a line of data
    // data: Buffer
    handleRawData(data) {
        // Add data to buffer
        this.stringDataBuffer += data.toString(this.encoding);

        if (this.stringDataBuffer.includes(this.lineEnding)) {
            // Keep text before line ending
            const line = this.stringDataBuffer.split(this.lineEnding)[0];
            // Remove text before line ending from buffer to avoid processing it twice
            this.stringDataBuffer = this.stringDataBuffer.split(this.lineEnding)[1];
            // Handle the line of data
            this.handleDataLine(line);
        }
    }

    handleDataLine(line) {
        // Skip data if under threshold
        if (Date.now() - this.lastDataTime < this.dataInterval) {
            return;
        } else {
            this.lastDataTime = Date.now();
        }

        console.log(line)

        // const dataList = line.trim().split(this.valueSeparator);

        // // ADD TESTS

        // const dataDict = {
        //     "time": dataList[0],
        //     "altitude": dataList[1],
        //     "pitch": dataList[2],
        //     "roll": dataList[3],
        //     "yaw": dataList[4],
        //     "lat": dataList[5],
        //     "lon": dataList[6],
        //     "speed": dataList[7],
        //     "acceleration": dataList[8],
        //     "temperature": dataList[9],
        //     "vibrations": dataList[10],
        //     "landing_force": dataList[11],
        //     "batt_check": dataList[12],
        //     "igniter_check": dataList[13],
        //     "gps_check": dataList[14],
        // }

        // // ADD TESTS

        // this.emit("data", dataDict);
    }

    // Extract a line of data
    // data: Buffer
    handleRawMockData(data) {
        // Add data to buffer
        this.stringDataBuffer += data.toString("utf-8");

        if (this.stringDataBuffer.includes('\n')) {
            // Keep text before line ending
            const line = this.stringDataBuffer.split('\n')[0];
            // Remove text before line ending from buffer to avoid processing it twice
            this.stringDataBuffer = this.stringDataBuffer.split('\n')[1];
            // Handle the line of data
            this.handleMockDataLine(line);
        }
    }

    handleMockDataLine(line) {
        // Skip data if under threshold
        if (Date.now() - this.lastDataTime < this.dataInterval) {
            return;
        } else {
            this.lastDataTime = Date.now();
        }

        const dataList = line.trim().split(',');

        const dataDict = {
            // "time": dataList[0],
            "time": (Date.now() - this.startDataTime) / 1000,
            "altitude": dataList[1],
            "pitch": dataList[2],
            "roll": dataList[3],
            "yaw": dataList[4],
            "lat": dataList[5],
            "lon": dataList[6],
            "speed": dataList[7],
            "acceleration": dataList[8],
            "temperature": dataList[9],
            "vibrations": dataList[10],
            "landing_force": dataList[11],
            "batt_check": dataList[12],
            "igniter_check": dataList[13],
            "gps_check": dataList[14],
        }

        this.emit("data", dataDict);
    }
}