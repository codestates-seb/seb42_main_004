package com.example.server.utils;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class CustomPage<T> extends PageImpl<T> {

    private final long total;

    public CustomPage(List<T> content, Pageable pageable, long total) {

        super(content, pageable,total);

        this.total = pageable.toOptional().filter(it -> !content.isEmpty())//
                .filter(it -> it.getOffset() + it.getPageSize() > total)//
                .map(it -> it.getOffset() + content.size())//
                .orElse(total);
    }

    public CustomPage(Page<T> page){
        super(page.getContent(), page.getPageable(), page.getTotalElements());

        this.total = page.getPageable().toOptional().filter(it -> !page.getContent().isEmpty())//
                .filter(it -> it.getOffset() + it.getPageSize() > page.getTotalElements())//
                .map(it -> it.getOffset() + page.getContent().size())//
                .orElse(page.getTotalElements());
    }

    public CustomPage(List<T> content) {
        this(content, Pageable.unpaged(), null == content ? 0 : content.size());
    }

    @Override
    public int getTotalPages() {
        int totalPages = 1;
        if(getSize() != 0) {
            if(isFirst()){
                totalPages = (int) Math.ceil((double) (total + 1) / (double) (getSize()+1));
            }
            else if(!isFirst()) {
                totalPages = (int) Math.ceil((double) (total + 1) / (double) getSize());
            }
        }
        return totalPages;
    }
}
