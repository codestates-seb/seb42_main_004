package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageInfo {
    private int page; //현재페이지
    private int size; //페이지당 담아야될 물건수
    private int totalPages; //토탈페이지
    private int totalElements; //토탈 물건수

    public PageInfo(int page, int size, int totalElements){
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = calcaulteTotalPages();
    }

    private int calcaulteTotalPages(){
        int totalpages = 1;
        if(totalElements > size - 1){
            totalpages = totalElements / size + 1 ;
        }
        return totalpages;
    }
}
