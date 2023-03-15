package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@AllArgsConstructor // 더미데이터용 롬복 -> 이후삭제요망
public class MultiResponseDto <T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber()+1, page.getSize(),
                page.getTotalPages(), (int) page.getTotalElements());
    }
}
