import fs from "fs";
import path from "path";
import {
    sendTransaction,
    shallPass,
    shallRevert
} from "@onflow/flow-js-testing";
import {expect} from "@jest/globals";

export const TRANSACTION_FILENAMES = {
    addVersionToTableFilename: "./../../../../transactions/executionNodeVersionBeacon/admin/add_version_to_table.cdc",
    changeVersionUpdateBufferFilename: "./../../../../transactions/executionNodeVersionBeacon/admin/change_version_update_buffer.cdc",
    changeVersionUpdateBufferVarianceFilename: "./../../../../transactions/executionNodeVersionBeacon/scripts/get_version_update_buffer.cdc",
    deleteUpcomingVersionBoundaryFilename: "./../../../../transactions/executionNodeVersionBeacon/admin/delete_upcoming_version_boundary.cdc",
}

// Sends named transaction expecting it to pass
export async function sendTransactionByFilenamePasses(filename, args, signers) {
    const code = readTransactionFile(
        filename
    )
    await shallPass(
        sendTransaction({
            code,
            args,
            signers
        })
    );
};

// Sends named transaction expecting it to revert
export async function sendTransactionByFilenameReverts(filename, args, signers) {
    const code = readTransactionFile(
        filename
    )
    await shallRevert(
        sendTransaction({
            code,
            args,
            signers
        })
    );
};

function readTransactionFile(filename) {
    try {
        return fs.readFileSync(
            path.resolve(
                __dirname,
                filename
            ),
            {encoding:'utf8', flag:'r'}
        );
    } catch (error) {
        throw error
    }
};