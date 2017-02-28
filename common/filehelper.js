var fs = require('fs');
var filehelper;
(function (filehelper) {

    function ShowListFile(pathfile, callback) {
        let listfile = [];
        let i = 0;
        let j = 0;
        fs.readdir(pathfile, function (err, files) {
            if (err) console.log(err.message);
            i = files.length;

            files.forEach(function (f) {

                var path = pathfile + "\\" + f;
                if (CheckDirectory(path)) {
                    ShowListFile(path);
                    j++;
                    console.log(path + ' is Directory');
                } else {

                    fs.stat(path, generate_callback(path, f));
                }

            });

        });

        function generate_callback(path, filename) {
            return function (err, stats) {
                j++;
                var file = {};
                file.name = filename;
                file.path = path;
                file.size = parseInt(parseInt(stats["size"]) / 1024) + ' KB';
                file.time = stats["mtime"];
                listfile.push(file);
                if (j == i) {
                    callback(listfile);
                }

            }
        };
    }

    filehelper.ShowListFile = ShowListFile;

    //Show Details File
    // function generate_callback(file) {
    //     return function (err, stats) {
    //         console.log(file);
    //         console.log(parseInt(parseInt(stats["size"]) / 1024) + ' KB');
    //     }
    // };


    //Check file exists
    function CheckFile(path) {
        return fs.exists(path);
    }

    filehelper.CheckDirectory = CheckDirectory;

    //Check directory exists
    function CheckDirectory(path) {
        var stats = fs.lstatSync(path);
        return stats.isDirectory();
    }

    filehelper.CheckDirectory = CheckDirectory;

    function RenameFile(pathFileOld, pathFileNew) {
        if (CheckFile(pathFileOld)) {
            fs.rename(pathFileOld, pathFileNew, function (err) {
                if (err) {
                    console.log('Rename error');
                } else {
                    console.log('Rename successfull');
                }
            });
        } else {
            console.log('Not exists file ' + pathFileOld);
        }

    }

    filehelper.RenameFile = RenameFile;

    function DeleteFile(path, callback) {
        try {

            fs.unlink(path, function (err) {
                callback(!err);
            });

        } catch (err) {
            callback(err);
        }

    }


    filehelper.DeleteFile = DeleteFile;

}(filehelper || (filehelper = {})));

module.exports = filehelper;