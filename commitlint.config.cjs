module.exports = {
    extends: ["@commitlint/config-conventional"],
    // 校验规则
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // 新功能
                "fix", // 修改bug
                "docs", // 更新文档
                "alter", // 调整
                "config", // 配置
                "refactor", // 重构
                "perf", // 性能提升
                "test", // 测试
                "chore", // 不影响功能的调整操作
                "revert", // 版本回退
                "build", // 打包
            ],
        ],
        "type-case": [0],
        "type-empty": [0],
        "scope-empty": [0],
        "scope-case": [0],
        "subject-full-stop": [0, "never"],
        "subject-case": [0, "never"],
        "header-max-length": [0, "always", 72],
    },
};