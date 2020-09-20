const mysql = require('mysql');
const bodyparser = require('body-parser');
const koneksi = require('cors');
const express = require('express');
const upload = require('express-fileupload');
const crypto = require('crypto');
var secret = 'rahasia';

const app = express();
const dbs = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'rumahouse',
        port: '3306'
    }
);

dbs.connect();

app.use(koneksi());
app.use(upload());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/tampungfile', express.static('tampungfile'));

app.post(`/registeruser`, (req, res) => {
    var namadepan = req.body.namadepan;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var handphone = req.body.handphone;
    var alamat = req.body.alamat;
    var posted = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');
    var encrypted = crypto.createHash('sha256', secret).update(password).digest('hex');
    var registeruser = `INSERT INTO master_user_admin SET namadepan="${namadepan}",username="${username}",email="${email}",password="${encrypted}",handphone="${handphone}",alamat_user_admin="${alamat}",waktubuat="${posted}"`;
    console.log(registeruser)
    dbs.query(registeruser, (err, result) => {
        console.log(result)
        console.log(err)
        if (err) {
            throw err;
        }
        else {
            res.send('Update database sukses')
            console.log("ada data yg masuk db")
        }
    });
});

app.post('/loginuser', (req, res) => {
    var id_user = req.body.username;
    var password_user = req.body.password;
    var password_encrypt = crypto.createHash('sha256', secret).update(password_user).digest('hex');

    var getData = 'SELECT * FROM master_user_admin';
    console.log(id_user)
    dbs.query(getData, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            for (i = 0; i < result.length; i++) {
                if ((id_user == result[i].username) && (password_encrypt == result[i].password)) {
                    console.log('Login Sukses')
                    var status = result[i].id;
                    console.log('iddd', status);
                    res.send(status.toString());
                    break;
                } else if (i === result.length - 1) {
                    console.log('Login Gagal')
                    var status = '-1';
                    res.send(status);
                    break;
                }
            }
        }
    });
});

var port = 8002;
app.listen(port, () => {
    console.log('Server berjalan di port ' + port + ' ....')
});

/**Ambil data untuk tampilan Properti baru */
app.post('/getNewRelease', (req, res) => {
    var sql = `SELECT * FROM view_all_product`;
    dbs.query(sql, (err, result) => {
        console.log(result, 'view_all_product')
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

/**Ambil data untuk tampilan Properti baru */
app.post('/getNewProperty', (req, res) => {
    var sql = `SELECT * FROM table_addproduk LIMIT 3`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

/**Ambil data untuk tampilan Properti populer */
app.get('/getPopularProperty', (req, res) => {
    var sql = `SELECT * FROM table_addproduk LIMIT 6`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.get('/produkdetail/:id', (req, res) => {
    var id_produk = req.params.id;
    var sql = `SELECT * FROM table_addproduk WHERE id="${id_produk}"`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});
app.get('/kategori_rumah', (req, res) => {
    var sql = `SELECT * FROM table_addproduk WHERE kategori=1`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.get('/kategori_apartment', (req, res) => {
    var sql = `SELECT * FROM table_addproduk WHERE kategori=2`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.post(`/detail_wishlist`, (req, res) => {
    var id_user = req.body.id_user;
    // var harga_produk = req.body.harga_produk;
    var id_produk = req.body.id_produk;
    // var minkuantiti = 1
    var sql = `INSERT INTO table_wishlist SET id_produk="${id_produk}", id_user="${id_user}"`;

    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send("berhasil")
        }
    })
})

app.get('/datawishlist', (req, res) => {
    var sql = ` SELECT table_wishlist.id, table_wishlist.id_produk,table_addproduk.posting, table_addproduk.id, table_addproduk.alamat, table_addproduk.harga,table_addproduk.foto_produk
                FROM table_wishlist
                JOIN table_addproduk ON table_wishlist.id_produk=table_addproduk.id`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.get('/datacheck', (req, res) => {
    var sql = `SELECT table_wishlist.id, table_wishlist.id_produk, table_addproduk.posting, table_addproduk.harga,table_addproduk.foto_produk FROM table_wishlist JOIN table_addproduk ON table_wishlist.id_produk=table_addproduk.id`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.post('/hapuswishlist', (req, res) => {
    var idwishlist = req.body.id_produk;
    // console.log(idwishlist);
    var hapuswishlist = `DELETE FROM table_wishlist WHERE id_produk="${idwishlist}"`;
    dbs.query(hapuswishlist, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.send('berhasil')
            // console.log("Ada wishlist yg Terhapus")
        }
    })
})

app.get('/grabdatauser/:id', (req, res) => {
    /** Menyiapkan query untuk ke MySQL */
    var grabdatauser = `SELECT * FROM master_user_admin WHERE id = ${req.params.id}`;
    /** Mengeksekusi query dengan syntax nodeJS */
    dbs.query(grabdatauser, (err, hasilquery) => {
        if (err) {
            /** Mengeluarkan pesan error apabila terjadi kesalahan */
            throw err;
        } else {
            /** Menyiapkan hasil query untuk siap dikirim */
            res.send(hasilquery);
        }
    })
});

app.post('/dataiklan', (req, res) => {
    // console.log(req.body)
    var id_username = req.body.id_username; // nanti di isi id user dari cookies.get yg di dapat
    var posting = req.body.posting;
    var harga = req.body.harga;
    var alamat = req.body.alamat;
    var status = req.body.status;
    var kategori = 1;
    var deskripsi = req.body.deskripsi;
    var foto_produk = req.files.foto_produk.name;
    var foto_produk2 = req.files.foto_produk2.name;
    var foto_produk3 = req.files.foto_produk3.name;
    var tanggaldibuat = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');

    if (id_username !== '' && posting !== '' && harga !== '' && alamat !== '' && status !== '' && deskripsi !== '' && foto_produk !== '' && tanggaldibuat !== '' && foto_produk2 !== '' && foto_produk3 !== '') {
        var filefoto_produk = req.files.foto_produk;
        var filefoto_produk2 = req.files.foto_produk2;
        var filefoto_produk3 = req.files.foto_produk3;

        filefoto_produk.mv("./tampungfile/" + foto_produk, (err) => {
            console.log('1', err)
            if (err) {
                console.log('Foto 1 terupload gagal');
            }
            else {
                console.log('Foto 1 terupload sukses')
                var sql = `INSERT INTO table_addproduk VALUES ("${''}", "${id_username}", "${posting}", "${harga}", "${alamat}", "${kategori}", "${status}", "${deskripsi}", "${foto_produk}", "${foto_produk2}", "${foto_produk3}", "${tanggaldibuat}")`;
                dbs.query(sql, (err, result) => {

                    console.log('2', err)
                    console.log('3', result)
                    console.log('4', sql)
                    if (err) {
                        throw err;
                    }
                    else {
                        res.send('1');
                    }
                })
            }
        }),
            filefoto_produk2.mv("./tampungfile/" + foto_produk2, (err) => {
                if (err) {
                    console.log('Foto 2 terupload gagal');
                }
                else {
                    console.log('Foto 2 terupload sukses')
                }
            }),

            filefoto_produk3.mv("./tampungfile/" + foto_produk3, (err) => {
                if (err) {
                    console.log('Foto 3 terupload gagal');
                }
                else {
                    console.log('Foto 3 terupload sukses')
                }
            })
    }
})


app.post('/dataprofile/:id', (req, res) => {
    var id_user = req.params.id;
    var sql = `SELECT posting, harga, master_user_admin.namadepan, table_addproduk.id, master_user_admin.alamat_user_admin, status, foto_produk, namadepan FROM table_addproduk INNER JOIN master_user_admin ON table_addproduk.id_username=master_user_admin.id WHERE id_username="${id_user}"`;
    dbs.query(sql, (err, result) => {
        console.log('result',result)
        console.log('err',err)
        console.log('sql',sql)
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.post('/datadashboard/:id', (req, res) => {
    var id_user = req.params.id;
    var sql = `SELECT posting, harga, master_user_admin.namadepan, table_addproduk.id, master_user_admin.alamat_user_admin, status, foto_produk, namadepan FROM table_addproduk INNER JOIN master_user_admin ON table_addproduk.id_username=master_user_admin.id WHERE id_username="${id_user}"`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

// Fungsi Hapus Category
app.post('/hapusdatadashboard', (req, res) => {
    var id = req.body.id;
    var hapusdatadashboard = `DELETE FROM table_addproduk WHERE id = ${id}`;
    dbs.query(hapusdatadashboard, (err, result) => {
        console.log(err)
        console.log(result)
        if (err) {
            throw err
        }
        else {
            res.send('Data Terhapus')
        }
    });
});

app.post('/Edit_iklan', (req, res) => {
    var id = req.body.id_produk;
    var edit_iklan = `SELECT * FROM table_addproduk WHERE id = ${id}`;
    dbs.query(edit_iklan, (err, result) => {
        if (err) {
            throw err
        }
        else {
            res.send(result)
            console.log("data edit terkirim")
        }
    });
});

app.post('/updateiklan', (req, res) => {
    // console.log(req.body)
    // var id_username = req.body.id_username;// nanti di isi id user dari cookies.get yg di dapat
    var id = req.body.id;
    var posting = req.body.posting;
    var harga = req.body.harga;
    var alamat = req.body.alamat;
    var status = req.body.status;
    var deskripsi = req.body.deskripsi;
    var foto_produk = req.files.foto_produk.name;
    var foto_produk2 = req.files.foto_produk2.name;
    var foto_produk3 = req.files.foto_produk3.name;
    var tanggaldibuat = (new Date((new Date((new Date(new Date())).toISOString())).getTime() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace('T', ' ');

    if (posting !== '' && harga !== '' && alamat !== '' && status !== '' && deskripsi !== '' && foto_produk !== '' && tanggaldibuat !== '' && foto_produk2 !== '' && foto_produk3 !== '') {
        var filefoto_produk = req.files.foto_produk;
        var filefoto_produk2 = req.files.foto_produk2;
        var filefoto_produk3 = req.files.foto_produk3;

        filefoto_produk.mv("./tampungfile/" + foto_produk, (err) => {
            if (err) {
                console.log('Foto 1 terupload gagal');
            }
            else {
                console.log('Foto 1 terupload sukses')
                var sql = `UPDATE table_addproduk SET posting = "${posting}", harga = "${harga}", alamat = "${alamat}", status = "${status}", deskripsi = "${deskripsi}", foto_produk = "${foto_produk}", tanggaldibuat = "${tanggaldibuat}", foto_produk2 = "${foto_produk2}", foto_produk3 = "${foto_produk3}" WHERE id="${id}"`;
                dbs.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.send('1');
                    }
                })
            }
        }),

            filefoto_produk2.mv("./tampungfile/" + foto_produk2, (err) => {
                if (err) {
                    console.log('Foto 2 terupload gagal');
                }
                else {
                    console.log('Foto 2 terupload sukses')
                }
            }),

            filefoto_produk3.mv("./tampungfile/" + foto_produk3, (err) => {
                if (err) {
                    console.log('Foto 3 terupload gagal');
                }
                else {
                    console.log('Foto 3 terupload sukses')
                }
            })
    }
})

app.post('/tarikstatus', (req, res) => {
    var sql = `SELECT * FROM master_status LIMIT 2`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});
app.post('/tarikstatus_edit', (req, res) => {
    var sql = `SELECT * FROM master_status`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});

app.get('/profil_detail/:id_produk', (req, res) => {
    var id = req.params.id_produk;
    var sql = `SELECT table_addproduk.id_username, master_user_admin.namadepan, master_user_admin.foto_profile, master_user_admin.username, master_user_admin.handphone FROM table_addproduk JOIN master_user_admin ON master_user_admin.id= table_addproduk.id_username WHERE table_addproduk.id="${id}"`;
    dbs.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});