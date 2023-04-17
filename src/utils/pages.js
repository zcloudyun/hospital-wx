 loadDataList:function(){
    let that=this
    that.dataListLoading=true
    let json={在职:1,离职:2,退休:3}
    let data = {
        page: that.pageIndex,
        length: that.pageSize,
        name: that.dataForm.name == '' ? null : that.dataForm.name,
        deptId: that.dataForm.deptId == '' ? null : that.dataForm.degree,
        degree: that.dataForm.degree == '' ? null : that.dataForm.degree,
        job: that.dataForm.job == '' ? null : that.dataForm.job,
        recommendede: that.dataForm.recommendede == '' ? null : that.dataForm.recommendede,
        status: json[that.dataForm.status],
        order: that.dataForm.order
    }
    console.log(data)
    that.$http('/doctor/searchByPage', 'post', data, true, function (res) { 
        console.log(res)
        let result = res.result
        let temp = {
            '1': '在职',
            '2': '离职',
            '3':'退休'
        }
        for (let one of result.list) { 
            one.status = temp[one.status + '']
        }
        that.dataList = result.list
        that.totalCount = result.totalCount
        that.dataListLoading=false
    })
}

//科室列表查询
loasMedicaldeptList: function() {
    let that = this
    that.$http('/medical/dept/searchAll', 'get', {}, true, function (res) { 
        that.medicalDeptList=res.result
    })
}