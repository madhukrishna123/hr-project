import oracledb from 'oracledb';
oracledb.initOracleClient({ libDir: '/Users/mharihar/Downloads/instantclient_19_8' });
var fetchData = async function (query, bindVar) {
    return await getData(query, bindVar);
};
var updateData = async function (region) {
    return await update(region)
};
var createData = async function (region) {
    return await addData(region)
};
var deleteData = async function (id) {
   return await removeData(id);
};
async function update(region) {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: "oracle",
            connectString: "localhost:49161/xe"
        });
        oracledb.autoCommit = true;
        console.log(region);
        const result = await connection.execute(
            `update regions set region_name = :region_name where region_id =:region_id`,
            {
                
                region_name: { dir: oracledb.BIND_IN, val: region.REGION_NAME, type: oracledb.STRING },
                region_id: { dir: oracledb.BIND_IN, val: region.REGION_ID, type: oracledb.NUMBER },
            }
        );
        console.log(result);
        return result;
    } catch (err) {
        console.log("Still need some work");
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err)
            }


        }
    }
}
async function removeData(id){
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: "oracle",
            connectString: "localhost:49161/xe"
        });
        oracledb.autoCommit = true;
        console.log(id);
        const result = await connection.execute(
            `delete from regions where region_id = :region_id`,
            {
                region_id: { dir: oracledb.BIND_IN, val: id, type: oracledb.NUMBER },
            }
        );
        return result;
    } catch (err) {
        console.log("Still need some work");
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err)
            }


        }
    }
}
async function addData(region) {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: "oracle",
            connectString: "localhost:49161/xe"
        });
        oracledb.autoCommit = true;
        console.log(region);
        const result = await connection.execute(
            `INSERT INTO regions VALUES (:region_id, :region_name)`,
            {
                region_id: { dir: oracledb.BIND_IN, val: region.REGION_ID, type: oracledb.NUMBER },
                region_name: { dir: oracledb.BIND_IN, val: region.REGION_NAME, type: oracledb.STRING }
            }
        );
        return result;
    } catch (err) {
        console.log("Still need some work");
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err)
            }


        }
    }
}

async function getData(query, bindVar) {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: "hr",
            password: "oracle",
            connectString: "localhost:49161/xe"
        });
        console.log(query);
        console.log(bindVar);
        const result = await connection.execute(query, [bindVar], {
            outFormat: oracledb.OBJECT
        });

        return result.rows;

    } catch (err) {
        console.log("Still need some work");
        console.log(err);

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err)
            }


        }
    }

}
export const dbService = {
    fetchData,
    updateData,
    createData,
    deleteData

};