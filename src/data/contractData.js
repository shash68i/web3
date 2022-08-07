export const contractAddress = "0x5dc3906Aa5573E5b3eBEd72db7670Dbd4cd2400d";

export const contractJsonAbi = `[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "DataSet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_x",
				"type": "string"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`;