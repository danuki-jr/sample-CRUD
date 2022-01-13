import mysqlConnection from '_db/mysql';

export default async (req, res) => {
    const {
        query: { process }
    } = req;
    switch (process) {
        case 'fetch':
            await fetchProducts(req, res);
            break;
        case 'add':
            await addProduct(req, res);
            break;
        case 'update':
            await updateProduct(req, res);
            break;
        case 'delete':
            await deleteProduct(req, res);
            break;
        default:
            res.status(404).json({
                message: 'NOT FOUND'
            })
            break;
    }
}

const fetchProducts = (req, res) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`SELECT * FROM products`, function (err, result) {
            if (err)
                return reject(err);
            else
                resolve(result);
        });
    }).then((result) => {
        res.status(200).json({
            message: 'OK',
            data: result
        });
    }).catch((err) => {
        res.status(500).json({
            message: 'INTERNAL_SERVER_ERROR'
        })
    });
}

const addProduct = (req, res) => {
    let bodyContent = req.body;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(`INSERT INTO products SET ?`, bodyContent.data, function (err, result) {
            if (err)
                return reject(err);
            else{
                resolve(result);
            }
        });
    }).then((result) => {
        let newResult = {
            id: result.insertId,
            name: bodyContent.data.name,
            description: bodyContent.data.description
        }
        res.status(200).json({
            message: 'OK',
            data: newResult
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'INTERNAL_SERVER_ERROR'
        })
    });
}

const updateProduct = (req, res) => {
    let bodyContent = req.body;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(`UPDATE products SET name=?, description=? WHERE id = ?`, [bodyContent.data.name, bodyContent.data.description, bodyContent.data.id], function (err, result) {
            if (err)
                return reject(err);
            else{
                resolve(result);
            }
        });
    }).then((result) => {
        let newResult = {
            id: bodyContent.data.id,
            name: bodyContent.data.name,
            description: bodyContent.data.description
        }
        res.status(200).json({
            message: 'OK',
            data: newResult
        });

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'INTERNAL_SERVER_ERROR'
        })
    });
}

const deleteProduct = (req, res) => {
    let bodyContent = req.body;

    return new Promise((resolve, reject) => {
        mysqlConnection.query(`DELETE FROM products WHERE id = ?`, bodyContent.data.id, function (err, result) {
            if (err)
                return reject(err);
            else{
                resolve(result);
            }
        });
    }).then((result) => {
        res.status(200).json({
            message: 'OK',
            data: {
                id: bodyContent.data.id
            }
        });

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'INTERNAL_SERVER_ERROR'
        })
    });
}
